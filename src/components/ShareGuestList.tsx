import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2, Download, Upload, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { exportGuestList, importAndMergeGuests } from '@/utils/shareUtils';
import { Guest } from '@/utils/storageUtils';

interface ShareGuestListProps {
  guests: Guest[];
  onGuestsImported: (guests: Guest[]) => void;
}

export function ShareGuestList({ guests, onGuestsImported }: ShareGuestListProps) {
  const [importCode, setImportCode] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Generate export code
  const exportCode = guests.length > 0 ? exportGuestList(guests) : '';

  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    if (!exportCode) {
      toast.error('Não há convidados para compartilhar');
      return;
    }

    navigator.clipboard.writeText(exportCode)
      .then(() => {
        setIsCopied(true);
        toast.success('Código copiado para a área de transferência!');
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch(() => {
        toast.error('Não foi possível copiar o código');
      });
  };

  // Handle import
  const handleImport = () => {
    if (!importCode.trim()) {
      toast.error('Por favor, insira o código compartilhado');
      return;
    }

    setIsImporting(true);

    try {
      const mergedGuests = importAndMergeGuests(importCode.trim());
      onGuestsImported(mergedGuests);
      toast.success(`Lista de convidados importada com sucesso! ${mergedGuests.length} convidados no total.`);
      setImportCode('');
      setIsImportOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao importar lista de convidados');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          onClick={() => {
            setIsExportOpen(!isExportOpen);
            setIsImportOpen(false);
          }}
        >
          <Share2 className="w-4 h-4" />
          Compartilhar Lista
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
          onClick={() => {
            setIsImportOpen(!isImportOpen);
            setIsExportOpen(false);
          }}
        >
          <Download className="w-4 h-4" />
          Importar Lista
        </Button>
      </div>

      {isExportOpen && (
        <Card className="mt-4 max-w-md mx-auto bg-white/90 backdrop-blur-sm border-green-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-700 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhar Lista de Convidados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="export-code" className="text-sm font-medium text-gray-700">
                  Código para compartilhar
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="export-code"
                    value={exportCode}
                    readOnly
                    className="pr-10 font-mono text-xs bg-gray-50"
                    placeholder="Nenhum convidado para compartilhar"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-green-600"
                    onClick={handleCopyToClipboard}
                    disabled={!exportCode}
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Copie este código e compartilhe com outras pessoas para que elas possam ver a lista de convidados.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isImportOpen && (
        <Card className="mt-4 max-w-md mx-auto bg-white/90 backdrop-blur-sm border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Importar Lista de Convidados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="import-code" className="text-sm font-medium text-gray-700">
                  Cole o código compartilhado
                </Label>
                <Input
                  id="import-code"
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  className="mt-1 font-mono text-xs"
                  placeholder="Cole o código aqui"
                  disabled={isImporting}
                />
              </div>
              <Button
                type="button"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleImport}
                disabled={isImporting || !importCode.trim()}
              >
                {isImporting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Importando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Importar Lista
                  </div>
                )}
              </Button>
              <p className="text-xs text-gray-500">
                Ao importar, os novos convidados serão adicionados à sua lista atual sem duplicações.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}