#!/usr/bin/env bash

VERSIONTAG="version1.0.test"
IMAGENAME_FRONTEND="rizalachp/todowebapp:${VERSIONTAG}"
IMAGENAME_BACKEND="rizalachp/todowebapp-api:${VERSIONTAG}"
PARRENT_DIR="$(pwd)"
FRONTEND_DIR="${PARRENT_DIR}/frontend"
BACKEND_DIR="${PARRENT_DIR}/backend"

cecho(){
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
    BLUE="\033[1;34m"
    CYAN="\033[1;36m"
    NC="\033[0m"
    printf "${!1}${2} ${NC}\n"
}

function buildimage_frontend(){
    cd ${FRONTEND_DIR}
    cecho BLUE "memasuki directory $(pwd)"
    bat --paging=never Dockerfile
    cecho BLUE "building the image ...."
    docker build -f ./Dockerfile -t "${IMAGENAME_FRONTEND}"
    cecho BLUE "done building the image ...."
    cecho BLUE "push the image to the repository..."
    docker push "${IMAGENAME_FRONTEND}"
} 

function buildimage_backend(){
    cd ${BACKEND_DIR}
    cecho BLUE "memasuki directory $(pwd)"
    bat --paging=never Dockerfile
    cecho BLUE "building the image ...."
    docker build -f ./Dockerfile -t "${IMAGENAME_FRONTEND}"
    cecho BLUE "done building the image ...."
    cecho BLUE "push the image to the repository..."
    docker push "${IMAGENAME_FRONTEND}"
    cecho BLUE "done push to repository..."
} 

cecho GREEN "check: apakah docker sudah login atau tidak"
echo "......."

if [ "$(docker info | grep "Username:")" ]
then 
    cecho GREEN "check-done: login user tersedia pada docker.io"
    echo "......."
else
    cecho YELLOW "check-done: login user tidak tersedia pada docker.io"
    cecho YELLOW "memproses untuk login, masukkan info login anda"
    echo "......."
    docker login
fi

cecho GREEN "directory project : ${PARRENT_DIR}"
echo "......."
cecho CYAN "memulai build image ${IMAGENAME_FRONTEND}"
echo "......."
buildimage_frontend
echo "......."
cecho CYAN "selesai build image ${IMAGENAME_FRONTEND}"
echo "......."
cecho CYAN "memulai build image ${IMAGENAME_BACKEND}"
echo "......."
buildimage_backend
echo "......."
cecho CYAN "selesai build image '${IMAGENAME_BACKEND}'"
echo "......."
cecho GREEN "...ALL DONE..."
