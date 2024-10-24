#!/bin/bash

# Backup directory to another location
SOURCE_DIR="/path/to/source_directory"
BACKUP_DIR="/path/to/backup_directory"

# Create the backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform the backup using rsync
rsync -av --delete $SOURCE_DIR $BACKUP_DIR

echo "Backup completed from $SOURCE_DIR to $BACKUP_DIR"
