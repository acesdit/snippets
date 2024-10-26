---
extension: sh
author: yashcodes29
category: Bash
layout: '../../layouts/SubmissionLayout.astro'
title: file_organizer
---
```sh
#!/bin/bash

# Directory to organize (default is the current directory)
TARGET_DIR="${1:-.}"

# Check if the target directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "Directory $TARGET_DIR does not exist."
  exit 1
fi

# Define file types and their associated folders
declare -A FILE_TYPES
FILE_TYPES=( ["Images"]="jpg png jpeg gif bmp" ["Documents"]="pdf docx txt md" ["Scripts"]="sh py js" ["Archives"]="zip tar.gz rar" )

# Create directories and move files
for CATEGORY in "${!FILE_TYPES[@]}"; do
  # Create folder if it doesn't exist
  if [ ! -d "$TARGET_DIR/$CATEGORY" ]; then
    mkdir "$TARGET_DIR/$CATEGORY"
  fi

  # Move files of matching types to respective folder
  for EXTENSION in ${FILE_TYPES[$CATEGORY]}; do
    find "$TARGET_DIR" -maxdepth 1 -type f -iname "*.$EXTENSION" -exec mv {} "$TARGET_DIR/$CATEGORY/" \;
  done
done

# Optional: Move other files (miscellaneous) to a separate folder
if [ ! -d "$TARGET_DIR/Misc" ]; then
  mkdir "$TARGET_DIR/Misc"
fi

# Move remaining files
find "$TARGET_DIR" -maxdepth 1 -type f -exec mv {} "$TARGET_DIR/Misc/" \;

echo "Files have been organized successfully."
```
