{
  "targets": [
    {
      "target_name": "factorial",
      "sources": [ "factorial.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}