filename="MyFile"

if [[ $filename != $(echo "$filename" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1') ]]; then
    echo "Filename '$filename' is not in Title Case."
    exit 1
fi
