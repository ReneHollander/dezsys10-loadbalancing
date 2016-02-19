#!/bin/bash

if [ ! -d "deps/" ]; then
  mkdir -p deps/
  cd deps/

  wget https://gmplib.org/download/gmp/gmp-6.1.0.tar.lz
  tar xfv gmp-6.1.0.tar.lz
  rm gmp-6.1.0.tar.lz
  mv gmp-6.1.0/ gmp/
  cd gmp/
  ./configure CFLAGS='-fPIC'
  make -j8
  cd ..
fi
