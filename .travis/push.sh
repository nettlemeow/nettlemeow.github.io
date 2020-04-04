setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add myorigin https://nettlemeow:${GH_TOKEN}@github.com/nettlemeow/nettlemeow-data.git
  git push --set-upstream myorigin master
}

cd ./source/data

setup_git
commit_website_files
upload_files

# remove data folder after committed updated files, so github pages will not include data folder.
rm -rf ./source/data
