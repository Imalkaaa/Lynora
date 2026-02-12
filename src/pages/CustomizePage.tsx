import { useState } from 'react';
import { Upload, Type, Palette, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

function getSessionId() {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export function CustomizePage() {
  const [customText, setCustomText] = useState('');
  const [fontStyle, setFontStyle] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [placement, setPlacement] = useState('center');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fonts = ['Arial', 'Georgia', 'Courier New', 'Brush Script', 'Impact'];
  const placements = ['center', 'top', 'bottom', 'left', 'right'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const sessionId = getSessionId();

    const { error } = await supabase.from('customizations').insert({
      session_id: sessionId,
      custom_text: customText,
      font_style: fontStyle,
      text_color: textColor,
      placement: placement,
      notes: notes,
      status: 'submitted',
    });

    if (error) {
      toast.error('Failed to submit customization');
      console.error(error);
    } else {
      toast.success('Customization submitted! We will contact you soon.');
      setCustomText('');
      setNotes('');
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-red-600 to-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customize Your Dress
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Create a unique, one-of-a-kind dress with your own designs, text, and style preferences.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Design Options</h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="custom-text" className="text-base font-semibold mb-2 flex items-center gap-2">
                      <Type className="h-4 w-4 text-red-600" />
                      Custom Text
                    </Label>
                    <Input
                      id="custom-text"
                      placeholder="Enter your custom text..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="font-style" className="text-base font-semibold mb-2 block">
                      Font Style
                    </Label>
                    <Select value={fontStyle} onValueChange={setFontStyle}>
                      <SelectTrigger id="font-style">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map((font) => (
                          <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="text-color" className="text-base font-semibold mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-red-600" />
                      Text Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-20 h-10 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="placement" className="text-base font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      Placement
                    </Label>
                    <Select value={placement} onValueChange={setPlacement}>
                      <SelectTrigger id="placement">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {placements.map((place) => (
                          <SelectItem key={place} value={place}>
                            {place.charAt(0).toUpperCase() + place.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="image-upload" className="text-base font-semibold mb-2 flex items-center gap-2">
                      <Upload className="h-4 w-4 text-red-600" />
                      Upload Custom Image
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-600 transition-colors cursor-pointer">
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {selectedImage ? (
                          <div>
                            <img
                              src={selectedImage}
                              alt="Preview"
                              className="max-h-40 mx-auto mb-2 rounded"
                            />
                            <p className="text-sm text-gray-600">Click to change image</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG up to 10MB
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions or requirements..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              onClick={handleSubmit}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg"
              disabled={!customText && !selectedImage}
            >
              Submit Design
            </Button>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Preview</h3>

                <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden mb-4">
                  <img
                    src="https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Dress template"
                    className="w-full h-full object-cover opacity-50"
                  />

                  {customText && (
                    <div
                      className={`absolute ${
                        placement === 'center'
                          ? 'inset-0 flex items-center justify-center'
                          : placement === 'top'
                          ? 'top-8 left-0 right-0 text-center'
                          : placement === 'bottom'
                          ? 'bottom-8 left-0 right-0 text-center'
                          : placement === 'left'
                          ? 'left-8 top-1/2 -translate-y-1/2'
                          : 'right-8 top-1/2 -translate-y-1/2'
                      }`}
                      style={{
                        color: textColor,
                        fontFamily: fontStyle,
                      }}
                    >
                      <p className="text-2xl font-bold px-4">{customText}</p>
                    </div>
                  )}

                  {selectedImage && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <img
                        src={selectedImage}
                        alt="Custom design"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Font:</span> {fontStyle}
                  </p>
                  <p>
                    <span className="font-semibold">Color:</span>{' '}
                    <span
                      className="inline-block w-4 h-4 rounded border align-middle"
                      style={{ backgroundColor: textColor }}
                    ></span>{' '}
                    {textColor}
                  </p>
                  <p>
                    <span className="font-semibold">Placement:</span>{' '}
                    {placement.charAt(0).toUpperCase() + placement.slice(1)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Design</h3>
              <p className="text-gray-600">
                Add your custom text, upload images, and choose your preferred styling options.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Review</h3>
              <p className="text-gray-600">
                Our team will review your design and contact you within 24 hours to confirm details.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Delivery</h3>
              <p className="text-gray-600">
                We'll print and ship your custom dress within 5-7 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
