{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShellNoCC {
  name = "dev-shell";
  packages = with pkgs; [ nodejs_23 typescript ];
}
