
import React, { useState } from 'react';
import { Schema } from '@/types/schema';
import { Table, FileType, FileSignature, Check, X, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import SchemaElementCard from './SchemaElementCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SchemaDetailsProps {
  schema: Schema | null;
}

const SchemaDetails = ({ schema }: SchemaDetailsProps) => {
  const { toast } = useToast();
  const [reviewMode, setReviewMode] = useState(false);
  const [feedback, setFeedback] = useState<string[]>([]);
  
  if (!schema) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Table className="h-16 w-16 mb-3 opacity-50" />
        <h3 className="text-lg font-medium mb-1">No Schema Selected</h3>
        <p className="text-sm">Please select a schema from the list to view details</p>
      </div>
    );
  }

  const handleToggleReviewMode = () => {
    setReviewMode(!reviewMode);
    if (!reviewMode) {
      toast({
        title: "Review Mode Activated",
        description: "Click Approve or Reject for each element to review the schema"
      });
    }
  };

  const handleApproveElement = (elementId: string) => {
    if (!feedback.includes(`approved-${elementId}`)) {
      setFeedback([...feedback.filter(f => !f.includes(`rejected-${elementId}`)), `approved-${elementId}`]);
      toast({
        title: "Element Approved",
        description: "You've marked this element as approved"
      });
    }
  };

  const handleRejectElement = (elementId: string) => {
    if (!feedback.includes(`rejected-${elementId}`)) {
      setFeedback([...feedback.filter(f => !f.includes(`approved-${elementId}`)), `rejected-${elementId}`]);
      toast({
        title: "Element Rejected",
        description: "You've marked this element as needing changes"
      });
    }
  };

  const getReviewStatus = () => {
    const approved = feedback.filter(f => f.includes('approved-')).length;
    const rejected = feedback.filter(f => f.includes('rejected-')).length;
    const total = schema.elements.length;
    const remaining = total - approved - rejected;
    
    return { approved, rejected, remaining, total };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <FileType className="h-5 w-5 text-blue-600" />
              Schema: {schema.name}
            </h2>
            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center">
              <FileSignature className="h-4 w-4 mr-1" />
              ID: {schema.id} • {schema.elements.length} Elements
            </div>
          </div>
          <Button 
            onClick={handleToggleReviewMode}
            variant={reviewMode ? "secondary" : "outline"}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {reviewMode ? "Exit Review" : "Review Schema"}
          </Button>
        </div>
        
        {reviewMode && (
          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
            <h3 className="font-medium text-sm text-blue-700 dark:text-blue-300 mb-2">Review Mode</h3>
            <div className="flex gap-3 text-sm">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-1" />
                <span>Approved: {getReviewStatus().approved}</span>
              </div>
              <div className="flex items-center">
                <X className="h-4 w-4 text-red-500 mr-1" />
                <span>Rejected: {getReviewStatus().rejected}</span>
              </div>
              <div className="flex items-center">
                <span>Remaining: {getReviewStatus().remaining}</span>
              </div>
              <div className="flex items-center">
                <span>Total: {getReviewStatus().total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schema.elements.map((element) => (
            <div key={element.id} className="relative">
              <SchemaElementCard element={element} />
              {reviewMode && (
                <div className="absolute bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 p-2 border-t border-gray-200 dark:border-gray-700 rounded-b-lg flex justify-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`${feedback.includes(`approved-${element.id}`) ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : ''}`}
                    onClick={() => handleApproveElement(element.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`${feedback.includes(`rejected-${element.id}`) ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : ''}`}
                    onClick={() => handleRejectElement(element.id)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchemaDetails;
