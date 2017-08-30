#!/bin/bash

### vars
VERBOSE_FILE=$HOME/Downloads/nodejs-install.log
FILE_NAME=node-v8.4.0-linux-x64.tar.xz
FILE_URL=https://nodejs.org/dist/latest-v8.x/$FILE_NAME
FILE_OUTPUT=$HOME/Downloads/$FILE_NAME
INSTALL_DIR=/opt/nodejs
LOCALBIN_DIR=$HOME/.local/bin

echo -e "==>> INSTALL NODE JS\n"

if [ ! -e $FILE_OUTPUT ]
   then
	echo -e "==>> DOWNLOADING $FILE_URL\n"
	wget --show-progress --append-output=$VERBOSE_FILE --output-document=$FILE_OUTPUT $FILE_URL
fi

## Extract NodeJS ##
echo -e "==>> EXTRACTING $FILE_OUTPUT\n"
sudo mkdir -p $INSTALL_DIR
sudo tar xvf $FILE_OUTPUT -C $INSTALL_DIR --strip-components=1

## Adding path to profile
sudo ln -s /opt/nodejs/bin/node /usr/sbin 
sudo ln -s /opt/nodejs/bin/npm /usr/sbin


echo -e "==>> END OF INSTALLATION SCRIPT \n"
echo -e "Goodbye.\n"

