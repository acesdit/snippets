rm -f src/pages/submissions/*
          for file in ALGORITHMS/*; do
              if [ -f "$file" ]; then
                  filename=$(basename "$file")
                  filename_noext="${filename%.*}"
                  file_extension="${filename##*.}"
                  echo "Creating $filename.md from $file"
                  
                  # Add front matter to the MD file
                  echo "---" > "src/pages/submissions/$filename.md"
                  echo "extension: $file_extension" >> "src/pages/submissions/$filename.md" # Add the extension
                  
                  # Get the author's username who committed the file
                  author_username=$(git log --reverse -1 --format='%an' -- "$file")
                  echo "author: $author_username" >> "src/pages/submissions/$filename.md" # Add the author
                  echo "category: Algorithms" >> "src/pages/submissions/$filename.md"
                  echo "layout: '../../layouts/SubmissionLayout.astro'" >> "src/pages/submissions/$filename.md"
                  echo "title: $filename_noext" >> "src/pages/submissions/$filename.md"
                  
                  echo "---" >> "src/pages/submissions/$filename.md"
                  echo "\`\`\`$file_extension" >> "src/pages/submissions/$filename.md"
                  
                  cat "$file" >> "src/pages/submissions/$filename.md"
                  echo "\n\`\`\`" >> "src/pages/submissions/$filename.md"
              fi
          done

for file in DATA\ STRUCTURES/*; do
              if [ -f "$file" ]; then
                  filename=$(basename "$file")
                  filename_noext="${filename%.*}"
                  file_extension="${filename##*.}"
                  echo "Creating $filename.md from $file"
                  
                  # Add front matter to the MD file
                  echo "---" > "src/pages/submissions/$filename.md"
                  echo "extension: $file_extension" >> "src/pages/submissions/$filename.md" # Add the extension
                  
                  # Get the author's username who committed the file
                  author_username=$(git log --reverse -1 --format='%an' -- "$file")
                  echo "author: $author_username" >> "src/pages/submissions/$filename.md" # Add the author
                  echo "category: Data Structures" >> "src/pages/submissions/$filename.md"
                  echo "layout: '../../layouts/SubmissionLayout.astro'" >> "src/pages/submissions/$filename.md"
                  echo "title: $filename_noext" >> "src/pages/submissions/$filename.md"
                  
                  echo "---" >> "src/pages/submissions/$filename.md"
                  echo "\`\`\`$file_extension" >> "src/pages/submissions/$filename.md"
                  
                  cat "$file" >> "src/pages/submissions/$filename.md"
                  echo "\n\`\`\`" >> "src/pages/submissions/$filename.md"
              fi
          done

for file in APPSCRIPT/*; do
              if [ -f "$file" ]; then
                  filename=$(basename "$file")
                  filename_noext="${filename%.*}"
                  file_extension="${filename##*.}"
                  echo "Creating $filename.md from $file"
                  
                  # Add front matter to the MD file
                  echo "---" > "src/pages/submissions/$filename.md"
                  echo "extension: $file_extension" >> "src/pages/submissions/$filename.md" # Add the extension
                  
                  # Get the author's username who committed the file
                  author_username=$(git log --reverse -1 --format='%an' -- "$file")
                  echo "author: $author_username" >> "src/pages/submissions/$filename.md" # Add the author
                  echo "category: AppScript" >> "src/pages/submissions/$filename.md"
                  echo "layout: '../../layouts/SubmissionLayout.astro'" >> "src/pages/submissions/$filename.md"
                  echo "title: $filename_noext" >> "src/pages/submissions/$filename.md"
                  
                  echo "---" >> "src/pages/submissions/$filename.md"
                  echo "\`\`\`$file_extension" >> "src/pages/submissions/$filename.md"
                  
                  cat "$file" >> "src/pages/submissions/$filename.md"
                  echo "\n\`\`\`" >> "src/pages/submissions/$filename.md"
              fi
          done

for file in BASH/*; do
              if [ -f "$file" ]; then
                  filename=$(basename "$file")
                  filename_noext="${filename%.*}"
                  file_extension="${filename##*.}"
                  echo "Creating $filename.md from $file"
                  
                  # Add front matter to the MD file
                  echo "---" > "src/pages/submissions/$filename.md"
                  echo "extension: $file_extension" >> "src/pages/submissions/$filename.md" # Add the extension
                  
                  # Get the author's username who committed the file
                  author_username=$(git log --reverse -1 --format='%an' -- "$file")
                  echo "author: $author_username" >> "src/pages/submissions/$filename.md" # Add the author
                  echo "category: Bash" >> "src/pages/submissions/$filename.md"
                  echo "layout: '../../layouts/SubmissionLayout.astro'" >> "src/pages/submissions/$filename.md"
                  echo "title: $filename_noext" >> "src/pages/submissions/$filename.md"
                  
                  echo "---" >> "src/pages/submissions/$filename.md"
                  echo "\`\`\`$file_extension" >> "src/pages/submissions/$filename.md"
                  
                  cat "$file" >> "src/pages/submissions/$filename.md"
                  echo "\n\`\`\`" >> "src/pages/submissions/$filename.md"
              fi
          done

for file in INTERVIEW\ QUESTIONS/*; do
              if [ -f "$file" ]; then
                  filename=$(basename "$file")
                  filename_noext="${filename%.*}"
                  file_extension="${filename##*.}"
                  echo "Creating $filename_noext.md from $file"
                  
                  # Add front matter to the MD file
                  echo "---" > "src/pages/submissions/$filename_noext.md"
                  echo "extension: $file_extension" >> "src/pages/submissions/$filename_noext.md" # Add the extension
                  
                  # Get the author's username who committed the file
                  author_username=$(git log --reverse -1 --format='%an' -- "$file")
                  echo "author: $author_username" >> "src/pages/submissions/$filename_noext.md" # Add the author
                  echo "category: Interview Questions" >> "src/pages/submissions/$filename_noext.md"
                  echo "layout: '../../layouts/SubmissionLayout.astro'" >> "src/pages/submissions/$filename_noext.md"
                  echo "title: $filename_noext" >> "src/pages/submissions/$filename_noext.md"
                  
                  echo "---" >> "src/pages/submissions/$filename_noext.md"
                  
                  cat "$file" >> "src/pages/submissions/$filename_noext.md"
              fi
          done

