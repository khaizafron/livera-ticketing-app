import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransferTicketModal = ({ isOpen, onClose, ticket, onTransfer }) => {
  const [transferData, setTransferData] = useState({
    recipientEmail: '',
    recipientName: '',
    message: '',
    notifyRecipient: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Success

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTransferData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!transferData.recipientEmail) {
      newErrors.recipientEmail = 'Recipient email is required';
    } else if (!/\S+@\S+\.\S+/.test(transferData.recipientEmail)) {
      newErrors.recipientEmail = 'Please enter a valid email address';
    }
    
    if (!transferData.recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStep(2);
  };

  const confirmTransfer = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call parent transfer function
      onTransfer(ticket.id, transferData);
      
      setStep(3);
    } catch (error) {
      setErrors({ submit: 'Transfer failed. Please try again.' });
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setTransferData({
      recipientEmail: '',
      recipientName: '',
      message: '',
      notifyRecipient: true
    });
    setErrors({});
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glassmorphism-card p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-white"
        >
          <Icon name="X" size={18} />
        </Button>

        {/* Step 1: Transfer Form */}
        {step === 1 && (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow">
                  <Icon name="Send" size={24} color="white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Transfer Ticket
              </h2>
              <p className="text-text-secondary text-sm">
                Send this ticket to someone else
              </p>
            </div>

            {/* Ticket Info */}
            <div className="mb-6 p-4 bg-surface rounded-lg">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">
                {ticket.eventTitle}
              </h3>
              <div className="text-sm text-text-secondary space-y-1">
                <div>Order ID: {ticket.orderId}</div>
                <div>Ticket Type: {ticket.ticketType}</div>
                <div>Quantity: {ticket.quantity}</div>
              </div>
            </div>

            {/* Transfer Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Recipient Email"
                type="email"
                name="recipientEmail"
                value={transferData.recipientEmail}
                onChange={handleInputChange}
                error={errors.recipientEmail}
                placeholder="Enter recipient's email address"
                required
              />

              <Input
                label="Recipient Name"
                type="text"
                name="recipientName"
                value={transferData.recipientName}
                onChange={handleInputChange}
                error={errors.recipientName}
                placeholder="Enter recipient's full name"
                required
              />

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={transferData.message}
                  onChange={handleInputChange}
                  placeholder="Add a personal message..."
                  rows={3}
                  className="w-full px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notifyRecipient"
                  name="notifyRecipient"
                  checked={transferData.notifyRecipient}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary bg-surface border-purple-500/30 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="notifyRecipient" className="text-sm text-text-secondary">
                  Send email notification to recipient
                </label>
              </div>

              {errors.submit && (
                <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
                  <p className="text-error text-sm">{errors.submit}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="default"
                fullWidth
                className="mt-6"
              >
                Review Transfer
              </Button>
            </form>
          </>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-warning to-accent rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} color="white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Confirm Transfer
              </h2>
              <p className="text-text-secondary text-sm">
                Please review the transfer details carefully
              </p>
            </div>

            {/* Transfer Summary */}
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-surface rounded-lg">
                <h3 className="font-semibold text-white mb-3">Ticket Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Event:</span>
                    <span className="text-white">{ticket.eventTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Order ID:</span>
                    <span className="text-white font-mono">{ticket.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Ticket Type:</span>
                    <span className="text-white">{ticket.ticketType}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface rounded-lg">
                <h3 className="font-semibold text-white mb-3">Transfer To</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Name:</span>
                    <span className="text-white">{transferData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Email:</span>
                    <span className="text-white">{transferData.recipientEmail}</span>
                  </div>
                  {transferData.message && (
                    <div>
                      <span className="text-text-secondary">Message:</span>
                      <p className="text-white mt-1">{transferData.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="text-warning font-medium mb-1">Important:</p>
                  <ul className="text-text-secondary space-y-1">
                    <li>• This action cannot be undone</li>
                    <li>• You will lose access to this ticket</li>
                    <li>• The recipient will receive full ticket ownership</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                fullWidth
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={confirmTransfer}
                loading={isLoading}
                fullWidth
              >
                Confirm Transfer
              </Button>
            </div>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center neon-glow">
                  <Icon name="CheckCircle" size={24} color="white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Transfer Successful!
              </h2>
              <p className="text-text-secondary text-sm">
                The ticket has been transferred successfully
              </p>
            </div>

            {/* Success Details */}
            <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg">
              <div className="text-sm space-y-2">
                <p className="text-success font-medium">
                  Ticket transferred to {transferData.recipientName}
                </p>
                <p className="text-text-secondary">
                  {transferData.notifyRecipient 
                    ? `A confirmation email has been sent to ${transferData.recipientEmail}`
                    : 'No email notification was sent'
                  }
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6 p-4 bg-surface rounded-lg">
              <h3 className="font-semibold text-white mb-3">What happens next?</h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                  <span>Recipient receives transfer notification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                  <span>Ticket ownership is transferred immediately</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                  <span>You will receive a transfer confirmation email</span>
                </li>
              </ul>
            </div>

            <Button
              variant="default"
              onClick={handleClose}
              fullWidth
            >
              Done
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TransferTicketModal;