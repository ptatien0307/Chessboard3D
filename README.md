# Chessboard3D
A Project using ThreeJS and Javasrcipt to create a 3D chessboard


# Chessboard

<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/1bd4816f-9cde-4a30-a56e-cc3283d2a0a1.png" alt="drawing" width="50%" height="50%"/>
</p>

<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/c689aa78-0dd6-406a-97a1-e5c8eb1fdf96.png" alt="drawing" width="50%" height="50%"/>
</p>


# Piece 
Pieces will be downloaded form **sketchfab**(https://sketchfab.com/marcelo.medeirossilva)
<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/abefacd2-69e9-4996-a6e7-07168f6b09cb.png" alt="drawing" width="50%" height="50%"/>
</p>
<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/8dbb5aa2-a1cf-49ea-8f78-adbc37f3817e.png" alt="drawing" width="50%" height="50%"/>
</p>

Piece's color will be change into black and white based on there position 
* White if z = 0 or z = 1
* Black if z = 7 or z = 6
<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/b01f1e1a-7dc9-4891-ac37-5b5f1faf3a96.png" alt="drawing" width="50%" height="50%"/>
</p>


# Move piece
Using **greensock** library to add animation for piece

Piece's valid moves will be presented as yellow on board
<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/879cfc03-65d2-40e3-8400-0042ed3d1674.png" alt="drawing" width="50%" height="50%"/>
</p>

If a piece can kill enemy's piece, there will be a red dot on enemy piece
<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/9e11b96a-7345-4eff-b32f-f3e4236d45a7.png" alt="drawing" width="50%" height="50%"/>
</p>

# Features
## Change camera position
<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/3ccb832f-8d29-4dfd-8611-213e856da36b.png" alt="drawing" width="50%" height="50%"/>
</p>

## Reset board
All piece after reset will be move to is original position
<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/17e9fcb0-a47e-4da2-becb-0d6d8d39a9297.png" alt="drawing" width="50%" height="50%"/>
</p>

## Change background
Background will be downloaded from https://polyhaven.com/hdris, these file have a suffix .hdr. Then using RGBELoader - a loader supported by ThreeJs to load the backgound

<p align="center">
<img src="https://github.com/ptatien0307/Chessboard3D/assets/79583501/b7b1f64a-d699-4c24-9a15-85c9c00dd476.png" alt="drawing" width="50%" height="50%"/>
</p>
