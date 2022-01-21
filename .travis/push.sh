setup_git() {
  git config --global user.email "bot@github.com"
  git config --global user.name "Github CI"
}

commit_website_files() {
  git add .
  git commit --message "Github build"
}

upload_files() {
  git remote add myorigin https://nettlemeow:${PUSH_TOKEN}@github.com/nettlemeow/nettlemeow-data.git
  git push --set-upstream myorigin master
}

cd ./source/data

setup_git
commit_website_files
upload_files

# remove data folder after committed updated files, so github pages will not include data folder.
rm -rf ../data
