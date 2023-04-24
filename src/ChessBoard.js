import * as THREE from "../node_modules/three/build/three.module.js";
import loadPiece from "./LoadPiece.js";

export default class ChessBoard {
    constructor() {
        this.board = new THREE.Group();
        this.board.name = "BOARD";
        this.colorValidMove = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this._initChessboard();
    }

    async _initChessboard() {
        await this._createBoard();
        await this._createPiece();
    }

    async _createBoard() {
        let cubeGeo = new THREE.BoxGeometry(2, 1, 2);
        let blackMat = new THREE.MeshBasicMaterial({ color: 0x6d4c3d });
        let whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffc1 });
        let grayMat = new THREE.MeshBasicMaterial({ color: 0x41251c });

        let flag = true;
        for (let x = 0; x < 16; x += 2) {
            for (let z = 0; z < 16; z += 2) {
                if (flag) {
                    var cube = new THREE.Mesh(cubeGeo, whiteMat);
                    flag = !flag;
                } else {
                    var cube = new THREE.Mesh(cubeGeo, blackMat);
                    flag = !flag;
                }
                cube.position.set(x, 0, z);
                this.board.add(cube);
            }
            flag = !flag;
        }

        for (let x = -2; x < 18; x += 2) {
            for (let z = -2; z < 18; z += 2) {
                if (z === 16 || z === -2 || x === -2 || x === 16) {
                    var cube = new THREE.Mesh(cubeGeo, grayMat);
                    cube.position.set(x, 0, z);
                    cube.rotation.set(0, Math.PI / 2, 0);
                }
                this.board.add(cube);
            }
        }
    }

    async _loadPawn(color) {
        let piece = await loadPiece(1, color);
        return piece;
    }

    async _loadRook(color) {
        var piece = await loadPiece(2, color);
        return piece;
    }

    async _loadKnight(color) {
        var piece = await loadPiece(3, color);
        return piece;
    }

    async _loadBishop(color) {
        var piece = await loadPiece(4, color);
        return piece;
    }

    async _loadKing(color) {
        var piece = await loadPiece(6, color);
        return piece;
    }

    async _loadQueen(color) {
        var piece = await loadPiece(5, color);
        return piece;
    }

    async _createPiece() {
        let i = 100;
        for (let x = 0; x < 16; x += 2) {
            for (let z = 0; z < 16; z += 2) {
                // Load pawn
                if (z === 2 || z === 12) {
                    var piece = await this._loadPawn(z);
                    piece.position.set(x, 0.5, z);

                    piece.userData.origPos = [x, 0.5, z];
                    piece.userData.currPos = [x, 0.5, z];
                    piece.userData.isAlive = true;
                    piece.userData.isFirstMove = true;
                    piece.userData.index = i;
                    i += 1;
                }

                // Load rook
                if ((x === 0 || x === 14) && (z === 0 || z === 14)) {
                    var piece = await this._loadRook(z);
                    piece.position.set(x, 0.5, z);

                    piece.userData.origPos = [x, 0.5, z];
                    piece.userData.currPos = [x, 0.5, z];
                    piece.userData.isAlive = true;
                    piece.userData.isFirstMove = true;
                    piece.userData.index = i;
                    i += 1;
                }

                // Load knight
                if ((x === 2 || x === 12) && (z === 0 || z === 14)) {
                    var piece = await this._loadKnight(z);
                    piece.position.set(x, 0.5, z);

                    piece.userData.origPos = [x, 0.5, z];
                    piece.userData.currPos = [x, 0.5, z];
                    piece.userData.isAlive = true;
                    piece.userData.isFirstMove = true;
                    piece.userData.index = i;
                    i += 1;
                }

                // Load bishop
                if ((x === 4 || x === 10) && (z === 0 || z === 14)) {
                    var piece = await this._loadBishop(z);
                    piece.position.set(x, 0.5, z);

                    piece.userData.origPos = [x, 0.5, z];
                    piece.userData.currPos = [x, 0.5, z];
                    piece.userData.isAlive = true;
                    piece.userData.isFirstMove = true;
                    piece.userData.index = i;
                    i += 1;
                }

                // Load king
                if (x === 6 && (z === 0 || z === 14)) {
                    var piece = await this._loadKing(z);
                    piece.position.set(x, 0.5, z);

                    piece.userData.origPos = [x, 0.5, z];
                    piece.userData.currPos = [x, 0.5, z];
                    piece.userData.isAlive = true;
                    piece.userData.isFirstMove = true;
                    piece.userData.index = i;
                    i += 1;
                }

                // Load queen
                if (x === 8 && (z === 0 || z === 14)) {
                    var piece = await this._loadQueen(z);
                    piece.position.set(x, 0.5, z);

                    piece.userData.origPos = [x, 0.5, z];
                    piece.userData.currPos = [x, 0.5, z];
                    piece.userData.isAlive = true;
                    piece.userData.isFirstMove = true;
                    piece.userData.index = i;
                    i += 1;
                }

                // Add to board
                this.board.add(piece);
            }
        }
    }
}
