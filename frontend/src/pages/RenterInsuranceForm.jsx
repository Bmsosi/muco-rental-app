import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RenterInsuranceForm() {
  const [formData, setFormData] = useState({
    tenantName: "",
    propertyAddress: "",
    landlordName: "",
    insuranceCompany: "",
    coverageLimit: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/renter-insurance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Renter_Insurance.pdf";
      a.click();
    } else {
      alert("Error generating PDF");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Renter’s Insurance Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label>Tenant Name</Label>
          <Input
            name="tenantName"
            value={formData.tenantName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Property Address</Label>
          <Input
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Landlord Name</Label>
          <Input
            name="landlordName"
            value={formData.landlordName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Insurance Company</Label>
          <Input
            name="insuranceCompany"
            value={formData.insuranceCompany}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Coverage Limit ($)</Label>
          <Input
            name="coverageLimit"
            value={formData.coverageLimit}
            onChange={handleChange}
          />
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Label>Start Date</Label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label>End Date</Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Generate PDF
        </Button>
      </form>
    </div>
  );
}
