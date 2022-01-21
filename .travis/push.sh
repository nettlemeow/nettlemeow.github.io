setup_git() {
  git config --global user.email "nettlemeow@outlook.com"
  git config --global user.name "nettlemeow"
}

commit_website_files() {
  git add .
  git commit --message "Github build"
}

upload_files() {
  git remote add myorigin https://${PAT}@github.com/nettlemeow/nettlemeow-data.git
  git push --set-upstream myorigin master
}

cd ./source/data

pwd
echo ${MYNAME}
setup_git
commit_website_files
upload_files

# remove data folder after committed updated files, so github pages will not include data folder.
rm -rf ../data
