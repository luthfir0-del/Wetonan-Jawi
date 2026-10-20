import React, { useRef, useEffect, useState } from 'react';
import { WetonResult } from '../lib/primbon';
import { Download, Copy, Check, X, Sparkles } from 'lucide-react';

interface WetonCardDownloadProps {
  weton: WetonResult;
  onClose: () => void;
}

export const WetonCardDownload: React.FC<WetonCardDownloadProps> = ({ weton, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    // 1. Background Luxury Deep Royal Navy Blue (Biru Dongker)
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060b18');
    bgGrad.addColorStop(0.3, '#0c1736');
    bgGrad.addColorStop(0.7, '#10224d');
    bgGrad.addColorStop(1, '#060b18');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Radial Gold & Cyan Glow in Center
    const glowGrad = ctx.createRadialGradient(width / 2, height / 2 - 50, 20, width / 2, height / 2, 450);
    glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
    glowGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.10)');
    glowGrad.addColorStop(1, 'rgba(10, 20, 50, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Ornate Golden Borders
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(42, 42, width - 84, height - 84);

    // Corner Ornaments
    const drawCorner = (x: number, y: number, dirX: number, dirY: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + dirY * 30);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dirX * 30, y);
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + dirX * 12, y + dirY * 12, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE047';
      ctx.fill();
    };

    drawCorner(50, 50, 1, 1);
    drawCorner(width - 50, 50, -1, 1);
    drawCorner(50, height - 50, 1, -1);
    drawCorner(width - 50, height - 50, -1, -1);

    // 3. Header Branding
    ctx.textAlign = 'center';
    ctx.fillStyle = '#93C5FD';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('PORTAL PRIMBON & HOROSKOP JAWI DIGITAL', width / 2, 85);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px "Cinzel", Georgia, serif';
    ctx.fillText('WetonanJawi.ai.id', width / 2, 122);

    ctx.fillStyle = '#FDE047';
    ctx.font = '20px "Noto Sans Javanese", sans-serif';
    ctx.fillText('ꦮꦼꦠꦺꦴꦤ꧀ꦤꦤ꧀ꦗꦮꦶ', width / 2, 152);

    // Small divider line
    ctx.beginPath();
    ctx.moveTo(width / 2 - 130, 172);
    ctx.lineTo(width / 2 + 130, 172);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Date of Birth
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Kelahiran: ${weton.formattedDate}`, width / 2, 215);

    // 5. Huge Weton Name Title
    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 52px "Cinzel", Georgia, serif';
    ctx.fillText(`${weton.dina.toUpperCase()} ${weton.pasaran.toUpperCase()}`, width / 2, 280);

    ctx.fillStyle = '#93C5FD';
    ctx.font = '28px "Noto Sans Javanese", sans-serif';
    ctx.fillText(weton.pasaranAksara, width / 2, 325);

    // 6. Neptu Circle Badge (Navy & Gold Ring)
    ctx.beginPath();
    ctx.arc(width / 2, 420, 65, 0, Math.PI * 2);
    ctx.fillStyle = '#0a142c';
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#93C5FD';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('TOTAL NEPTU', width / 2, 395);

    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 54px "Cinzel", Georgia, serif';
    ctx.fillText(weton.neptuTotal.toString(), width / 2, 445);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`(Dina ${weton.neptuDina} + Pasaran ${weton.neptuPasaran})`, width / 2, 470);

    // 7. Grid of Attributes
    const drawInfoBox = (x: number, y: number, w: number, h: number, title: string, value: string) => {
      ctx.fillStyle = 'rgba(10, 20, 45, 0.85)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, w, h);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#93C5FD';
      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title.toUpperCase(), x + 16, y + 26);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px "Cinzel", Georgia, serif';
      ctx.fillText(value, x + 16, y + 54);
    };

    const boxW = 320;
    const boxH = 75;
    const leftX = 70;
    const rightX = 410;

    drawInfoBox(leftX, 520, boxW, boxH, 'Watak Lahiriah (Lakuning)', weton.lakuning);
    drawInfoBox(rightX, 520, boxW, boxH, 'Pawukon (Wuku)', `Wuku ${weton.wuku}`);
    drawInfoBox(leftX, 615, boxW, boxH, 'Garis Rezeki (Pancasuda)', weton.pancasuda);
    drawInfoBox(rightX, 615, boxW, boxH, 'Arah Kejayaan Rezeki', weton.karirRezeki.arahKejayaan);
    drawInfoBox(leftX, 710, boxW, boxH, 'Kepemimpinan (Rakam)', weton.rakam);
    drawInfoBox(rightX, 710, boxW, boxH, 'Warna Aura Keberuntungan', weton.warnaAura.nama);

    // 8. Footer Proverb & Watermark
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'italic 16px "Cinzel", Georgia, serif';
    ctx.fillText('"Urip Iku Urup • Memayu Hayuning Bawana"', width / 2, 845);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Official Portal Threads & YouTube @wetonanjawi', width / 2, 875);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('https://wetonanjawi.ai.id', width / 2, 910);

    // Generate downloadable PNG URL
    const url = canvas.toDataURL('image/png');
    setDownloadUrl(url);
  }, [weton]);

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `kartu-weton-${weton.dina.toLowerCase()}-${weton.pasaran.toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } catch (e) {
      console.error(e);
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0c1838] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-blue-300 hover:text-white p-2 rounded-full hover:bg-blue-900/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Kartu Weton Keraton Digital (Biru Dongker)
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            {weton.dina} {weton.pasaran}
          </h3>
          <p className="text-blue-200/80 text-xs mt-1">
            Siap diunduh dan dibagikan ke WhatsApp / Threads / Instagram
          </p>
        </div>

        {/* Canvas Display */}
        <div className="flex justify-center my-3 bg-[#081026] p-3 rounded-2xl border border-blue-900/60 shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[340px] h-auto rounded-xl shadow-2xl border border-blue-500/40"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Gambar PNG</span>
          </button>

          <button
            onClick={handleCopyImage}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#081026] hover:bg-blue-950 text-amber-300 border border-blue-500/40 font-semibold text-xs transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Gambar Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Gambar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
