import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from "@medicycle/ui";
import { UploadCloud, Camera, CheckCircle2, FileText, Pill } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UploadMedicine = () => {
  const [step, setStep] = useState<"upload" | "scanning" | "verify">("upload");

  const handleUpload = () => {
    setStep("scanning");
    setTimeout(() => {
      setStep("verify");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Upload Medicine</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Area */}
        <Card glass className="flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle>Medicine Details</CardTitle>
            <CardDescription>Upload an image of the medicine packaging or prescription</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {step === "upload" && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl hover:border-primary/50 transition-colors bg-white/5 cursor-pointer"
                  onClick={handleUpload}
                >
                  <div className="p-4 rounded-full bg-primary/20 mb-4 text-primary">
                    <UploadCloud size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">Click or drag image to upload</h3>
                  <p className="text-sm text-gray-400 mb-6">Supports JPG, PNG, WebP (Max 5MB)</p>
                  <Button variant="outline" leftIcon={<Camera size={16} />}>Open Camera</Button>
                </motion.div>
              )}

              {step === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl border-2 border-primary overflow-hidden relative bg-surface">
                      <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_#3B82F6] animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white">Extracting Details...</h3>
                    <p className="text-sm text-gray-400">Our OCR is analyzing the medicine packaging</p>
                  </div>
                </motion.div>
              )}

              {step === "verify" && (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <div className="p-4 rounded-full bg-success/20 mb-4 text-success">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Scan Complete</h3>
                  <p className="text-sm text-gray-400 text-center mb-6">
                    We've extracted the details. Please verify the information on the right.
                  </p>
                  <Button variant="outline" onClick={() => setStep("upload")}>Scan Another</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Form Area */}
        <Card glass className="flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle>Verify Information</CardTitle>
            <CardDescription>Review and correct any extracted details</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Medicine Name</label>
              <Input
                defaultValue={step === "verify" ? "Amoxicillin 500mg" : ""}
                leftIcon={<Pill size={16} />}
                disabled={step !== "verify"}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Quantity</label>
                <Input
                  type="number"
                  defaultValue={step === "verify" ? "14" : ""}
                  disabled={step !== "verify"}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Expiry Date</label>
                <Input
                  type="date"
                  defaultValue={step === "verify" ? "2027-10-15" : ""}
                  disabled={step !== "verify"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Manufacturer (Optional)</label>
              <Input
                defaultValue={step === "verify" ? "Pfizer" : ""}
                disabled={step !== "verify"}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Asking Price ($)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                disabled={step !== "verify"}
              />
            </div>
            
            <div className="pt-4">
              <Button className="w-full" disabled={step !== "verify"}>
                Submit Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default UploadMedicine;
