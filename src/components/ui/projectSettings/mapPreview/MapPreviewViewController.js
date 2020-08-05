import React, { Component } from 'react';
import MapPreviewView from './MapPreviewView';
import "./main.css";
import REGL from 'regl';
import * as THREE from 'three';

import { connect } from 'react-redux';

import vShader from '../../../3dView/main/Shaders/CanvasShaders/Canvas_vShader'
import fShader from '../../../3dView/main/Shaders/CanvasShaders/Canvas_fShader'

class MapPreviewViewController extends Component {

    constructor(props) {
        super(props)
        this.initCanvas = this.initCanvas.bind(this)
        this.updateCanvas = this.updateCanvas.bind(this)
    }

    initCanvas = (canvas) => {
        if (canvas) {
            const gl = canvas.getContext('webgl')
            const uniforms = {
                seed: 1,
                scale: this.props.GEN_scale,
                persistance: this.props.GEN_persistance,
                lacunarity: this.props.GEN_lacunarity,
                octaves: this.props.GEN_octaves,
                redistribution: this.props.GEN_redistribution,
                xOff: this.props.GEN_xOff,
                yOff: this.props.GEN_yOff
            }


            const regl = REGL(gl)
            const geoetry = makePlaneGeo(this.props.GLOBAL_terrainResolution)
            this.drawHeightMap = regl({
                frag: fShader,
                vert: vShader,
                attributes: {
                    position: geoetry
                },
                uniforms: {
                    seed: 1,
                    scale: regl.prop('scale'),
                    persistance: regl.prop('persistance'),
                    lacunarity: regl.prop('lacunarity'),
                    octaves: regl.prop('octaves'),
                    redistribution: regl.prop('redistribution'),
                    xOff: regl.prop('xOff'),
                    yOff: regl.prop('yOff')

                },
                count: geoetry.length
            })
            this.capture = true
            regl.frame(() => {
                if (this.props.GLOBAL_doesCaptureMap) {
                    var link = document.createElement('a');
                    link.download = 'filename.png';
                    link.href = canvas.toDataURL('image/png')
                    link.click();

                    this.props.set_GLOBAL_doesCaptureMap(false)
                }
            })

            this.drawHeightMap(uniforms)
        }
    }

    updateCanvas = () => {
        const uniforms = {
            seed: 1,
            scale: this.props.GEN_scale,
            persistance: this.props.GEN_persistance,
            lacunarity: this.props.GEN_lacunarity,
            octaves: this.props.GEN_octaves,
            redistribution: this.props.GEN_redistribution,
            xOff: this.props.GEN_xOff,
            yOff: this.props.GEN_yOff
        }
        this.drawHeightMap(uniforms)
    }

    render() {
        return (
            <MapPreviewView
                initCanvas={this.initCanvas}
                updateCanvas={this.updateCanvas}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        GLOBAL_terrainResolution: state.GLOBAL_terrainResolution,
        GLOBAL_doesCaptureMap: state.GLOBAL_doesCaptureMap,

        GEN_scale: state.GEN_Scale,
        GEN_persistance: state.GEN_Persistance,
        GEN_lacunarity: state.GEN_Lacunarity,
        GEN_octaves: state.GEN_Octaves,
        GEN_redistribution: state.GEN_Redistribution,
        GEN_xOff: state.GEN_xOff,
        GEN_yOff: state.GEN_yOff,
    }
}


function makePlaneGeo(res) {
    let verts = []

    const planeGeo = new THREE.PlaneBufferGeometry(2, 2, res, res)
    for (let i = 0; i < planeGeo.index.count / 3; i++) {

        const faceA = planeGeo.index.array[(i * 3) + 0]
        const faceB = planeGeo.index.array[(i * 3) + 1]
        const faceC = planeGeo.index.array[(i * 3) + 2]

        const vertAx = planeGeo.attributes.position.array[(faceA * 3) + 0]
        const vertAy = planeGeo.attributes.position.array[(faceA * 3) + 1]

        const vertBx = planeGeo.attributes.position.array[(faceB * 3) + 0]
        const vertBy = planeGeo.attributes.position.array[(faceB * 3) + 1]

        const vertCx = planeGeo.attributes.position.array[(faceC * 3) + 0]
        const vertCy = planeGeo.attributes.position.array[(faceC * 3) + 1]

        verts.push([vertAx, vertAy])
        verts.push([vertBx, vertBy])
        verts.push([vertCx, vertCy])

    }
    return verts
}

function mapDispatchToProps(dispatch) {
    return {
        set_GLOBAL_doesCaptureMap: (data) => dispatch({type: 'set_GLOBAL_doesCaptureMap', data: data})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MapPreviewViewController)
