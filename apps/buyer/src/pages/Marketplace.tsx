import React from "react";
import { useListings } from "@medicycle/hooks";
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from "@medicycle/ui";
import { Search, Filter, ShoppingCart, Pill } from "lucide-react";
import { motion } from "framer-motion";

const Marketplace = () => {
  const { data: listings, isLoading } = useListings();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/5 bg-surface/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Pill className="text-primary" size={24} />
          <span className="text-xl font-bold tracking-tight text-white">MediCycle</span>
        </div>
        <nav className="flex gap-4 text-sm font-medium">
          <a href="/marketplace" className="text-primary">Marketplace</a>
          <a href="/chat" className="text-gray-300 hover:text-white transition-colors">Messages</a>
          <Button variant="outline" size="icon"><ShoppingCart size={16} /></Button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8 mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Available Medicines</h1>
            <p className="text-gray-400 mt-1">Safely purchase verified unused medicines.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input 
              placeholder="Search medicines..." 
              leftIcon={<Search size={16} />}
              className="w-full md:w-64"
            />
            <Button variant="outline" size="icon"><Filter size={16} /></Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} glass className="h-72 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings?.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400">
                <Pill size={48} className="mx-auto mb-4 opacity-20" />
                <p>No medicines currently available.</p>
              </div>
            ) : (
              listings?.map((listing: any, index: number) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card glass hoverEffect className="h-full flex flex-col">
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-transparent border-b border-white/5 flex items-center justify-center p-4">
                       <Pill size={40} className="text-primary/50" />
                    </div>
                    <CardHeader className="flex-none p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-1">{listing.medicine?.name || "Medicine"}</CardTitle>
                        <span className="text-lg font-bold text-success">${listing.price}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Exp: {new Date(listing.expiry_date).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 pt-2 flex flex-col justify-end">
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-medium text-gray-300">Qty: {listing.quantity}</span>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
