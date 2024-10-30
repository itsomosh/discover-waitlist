import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Building2, MapPin, Phone, Mail, Camera } from 'lucide-react';

type Step = {
  title: string;
  icon: React.ReactNode;
  fields: {
    name: keyof typeof initialFormData;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
  }[];
};

const initialFormData = {
  businessName: '',
  businessType: '',
  description: '',
  address: '',
  location: '',
  phone: '',
  email: '',
  website: '',
  images: [] as string[],
  ownershipProof: '',
};

const steps: Step[] = [
  {
    title: 'Business Details',
    icon: <Building2 className="w-6 h-6" />,
    fields: [
      {
        name: 'businessName',
        label: 'Business Name',
        type: 'text',
        placeholder: 'Enter your business name',
        required: true,
      },
      {
        name: 'businessType',
        label: 'Business Type',
        type: 'select',
        placeholder: 'Select business type',
        required: true,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Describe your business',
        required: true,
      },
    ],
  },
  {
    title: 'Location',
    icon: <MapPin className="w-6 h-6" />,
    fields: [
      {
        name: 'address',
        label: 'Street Address',
        type: 'text',
        placeholder: 'Enter street address',
        required: true,
      },
      {
        name: 'location',
        label: 'Location Details',
        type: 'text',
        placeholder: 'Additional location details',
      },
    ],
  },
  {
    title: 'Contact',
    icon: <Phone className="w-6 h-6" />,
    fields: [
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+254 XXX XXX XXX',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'business@example.com',
        required: true,
      },
      {
        name: 'website',
        label: 'Website',
        type: 'url',
        placeholder: 'https://',
      },
    ],
  },
  {
    title: 'Media',
    icon: <Camera className="w-6 h-6" />,
    fields: [
      {
        name: 'images',
        label: 'Business Photos',
        type: 'file',
        placeholder: 'Upload photos',
        required: true,
      },
      {
        name: 'ownershipProof',
        label: 'Proof of Ownership',
        type: 'file',
        placeholder: 'Upload document',
        required: true,
      },
    ],
  },
];

export function BusinessForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://hook.eu1.make.com/d84f45p9dvjib7ztigrb4g4tni6s73xm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitStatus('success');
      setFormData(initialFormData);
      setCurrentStep(0);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          List Your Business
        </h2>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
            Thank you for your submission! We'll review your listing and contact you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            Something went wrong. Please try again later.
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index === currentStep
                  ? 'text-blue-600'
                  : index < currentStep
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index === currentStep
                      ? 'border-blue-600 bg-blue-50'
                      : index < currentStep
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-300'
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs mt-1">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-2 ${
                    index < currentStep ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {steps[currentStep].fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] as string}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                  placeholder={field.placeholder}
                  rows={4}
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] as string}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                >
                  <option value="">{field.placeholder}</option>
                  <option value="hotel">Hotel</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="activity">Activity/Tour</option>
                  <option value="transport">Transport</option>
                  <option value="shop">Shop</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  value={field.type !== 'file' ? (formData[field.name] as string) : undefined}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          <div className="flex justify-between pt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 ml-auto"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}