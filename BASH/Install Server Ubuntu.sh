# ======================== 
# Readme
# this script is for installing server on ubuntu
# package list:
#  - nginx
#  - vim
#  - docker
# ======================== 

log_file=~/install_progress_log.txt

sudo apt update

# ======================== 
# Install nginx
# ======================== 
sudo apt -y install nginx
if type -p nginx > /dev/null; then
    echo "nginx Installed" >> $log_file
else
    echo "nginx FAILED TO INSTALL!!!" >> $log_file
fi

# ======================== 
# Install vim
# ======================== 
sudo apt -y install vim
if type -p vim > /dev/null; then
    echo "vim Installed" >> $log_file
else
    echo "vim FAILED TO INSTALL!!!" >> $log_file
fi

# ======================== 
# Install docker
# ======================== 
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

sudo apt update

sudo apt -y install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
"deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
"$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
if type -p docker > /dev/null; then
    echo "docker Installed" >> $log_file
else
    echo "docker FAILED TO INSTALL!!!" >> $log_file
fi