from PyPDF2 import PdfMerger

def merge_pdfs(pdf_list, output):
    merger = PdfMerger()
    
    for pdf in pdf_list:
        merger.append(pdf)
    
    merger.write(output)
    merger.close()
    print(f"PDFs merged into {output}")

pdfs = ['file1.pdf', 'file2.pdf', 'file3.pdf']  # List of PDFs to merge
output_pdf = 'merged_output.pdf'
merge_pdfs(pdfs, output_pdf)
