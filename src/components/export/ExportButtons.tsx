"use client";

import { Printer, FileDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ExportButtons({
  printLabel,
  targetId,
  filename,
}: {
  printLabel: string;
  targetId: string;
  filename: string;
}) {
  const t = useTranslations("common");

  const handlePrint = () => {
    window.print();
  };

  const handlePdf = async () => {
    const el = document.getElementById(targetId);
    if (!el) {
      window.print();
      return;
    }
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: getComputedStyle(document.body).backgroundColor,
      });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      let heightLeft = h;
      let position = 0;
      pdf.addImage(img, "PNG", (pageWidth - w) / 2, position, w, h);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - h;
        pdf.addPage();
        pdf.addImage(img, "PNG", (pageWidth - w) / 2, position, w, h);
        heightLeft -= pageHeight;
      }
      pdf.save(`${filename}.pdf`);
    } catch {
      window.print();
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <Printer className="size-3.5" />
        {printLabel || t("print")}
      </Button>
      <Button variant="outline" size="sm" onClick={handlePdf}>
        <FileDown className="size-3.5" />
        {t("exportPdf")}
      </Button>
    </div>
  );
}
