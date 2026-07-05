import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from "@medicycle/ui";
import { UploadCloud, Camera, CheckCircle2, Pill } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateListing } from "@medicycle/hooks";

const UploadMedicine = () => {
  const [step, setStep] = useState<"upload" | "scanning" | "verify" | "success">("upload");
  
  // Form State
  const [name, setName] = useState("Amoxicillin 500mg");
  const [quantity, setQuantity] = useState("14");
  const [expiryDate, setExpiryDate] = useState("2027-10-15");
  const [manufacturer, setManufacturer] = useState("Pfizer");
  const [price, setPrice] = useState("");

  const createListingMutation = useCreateListing();

  const handleUpload = () => {
    setStep("scanning");
    setTimeout(() => {
      setStep("verify");
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!price) return;

    createListingMutation.mutate({
      name,
      quantity: parseInt(quantity, 10),
      expiry_date: expiryDate,
      manufacturer,
      price: parseFloat(price)
    }, {
      onSuccess: () => {
        setStep("success");
        setTimeout(() => {
          setStep("upload");
          setPrice("");
        }, 3000);
      }
    });
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
                    <div className="w-40 h-40 rounded-2xl border border-white/10 overflow-hidden relative bg-surface/50 backdrop-blur-md shadow-glass flex items-center justify-center">
                      <Pill size={48} className="text-gray-500 opacity-20" />
                      
                      {/* Scanning Laser Line */}
                      <motion.div 
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_#3B82F6]"
                      >
                        {/* Glow trailing effect */}
                        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-t from-primary/30 to-transparent -translate-y-full" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white">Extracting Details...</h3>
                    <p className="text-sm text-gray-400 mt-1">Our AI is analyzing the packaging</p>
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
              
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <div className="p-4 rounded-full bg-primary/20 mb-4 text-primary shadow-glow-primary">
                    <Pill size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Listing Published!</h3>
                  <p className="text-sm text-gray-400 text-center">
                    Your medicine is now live on the marketplace.
                  </p>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Medicine Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<Pill size={16} />}
                  disabled={step !== "verify"}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Quantity</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={step !== "verify"}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Expiry Date</label>
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    disabled={step !== "verify"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Manufacturer (Optional)</label>
                <Input
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  disabled={step !== "verify"}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Asking Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={step !== "verify"}
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={step !== "verify" || createListingMutation.isPending}
                >
                  {createListingMutation.isPending ? "Publishing..." : "Submit Listing"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadMedicine;
