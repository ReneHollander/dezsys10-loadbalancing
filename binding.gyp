{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "src/addon.cc",
        "src/pi.cc"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "./deps/gmp/"
      ],
      'libraries': ['-L../deps/gmp/.libs -lgmp'],
    }
  ]
}
