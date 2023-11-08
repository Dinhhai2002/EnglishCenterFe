import PyPDF2
import pdfplumber
import pandas as pd
import spacy
import re
# import fitz  # PyMuPDF

nlp = spacy.load("en_core_web_sm")
# content=read_pdf("F:\English\Đề thi\ĐỀ 1\ĐỀ BÀI.pdf")

def extract_questions_from_pdf(pdf_file):
    questions_and_answers = []
    with pdfplumber.open(pdf_file) as pdf:
        # Lặp qua từng trang trong file PDF
        for page_num in range(len(pdf.pages)):
            page = pdf.pages[page_num]
            text = page.extract_text()
            
            # Sử dụng regex để lọc ra câu hỏi từ phần 1 đến phần 4 trong văn bản
            pattern = r'Questions \d{1,3}-\d{1,3}.*?(\n.*?\?)'
            matches = re.findall(pattern, text, re.DOTALL)
            
            for match in matches:
                question = match.strip()
                
                # Xác định vị trí của câu trả lời trong văn bản
                answer_start_idx = text.find(match) + len(match)
                answer_end_idx = text.find("\n", answer_start_idx)
                answers_text = text[answer_start_idx:answer_end_idx].strip()
                
                # Tách nội dung các câu trả lời thành 4 phần
                answers = [ans.strip() for ans in re.split(r"[A-D]\.", answers_text)]
                
                # Thêm câu hỏi và đáp án vào danh sách tổng
                questions_and_answers.append((question, answers))
            
    return questions_and_answers

# Gọi hàm và truyền vào file PDF của đề thi TOEIC
pdf_file_path = "F:\English\Đề thi\ĐỀ 1\ĐỀ BÀI.pdf"
questions = extract_questions_from_pdf(pdf_file_path)

for idx, (question, answers) in enumerate(questions, start=1):
    print(f"Question {idx}: {question}")
    # for ans_idx, answer in enumerate(answers, start=1):
    #     print(f"  Answer {ans_idx}: {answer}")