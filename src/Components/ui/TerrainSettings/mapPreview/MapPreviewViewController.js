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
        this.canvas = undefined
        this.regl = undefined
    }

    componentDidUpdate(pProps) {
        if (Number(pProps.MAP_Resolution) !== Number(this.props.MAP_Resolution)) {
            this.regl.destroy()
            this.regl = this.initREGL(this.canvas)
        }
    }

    initCanvas = (canvas) => {
        if (canvas) {
            this.canvas = canvas
            this.regl = this.initREGL(canvas)
        }
    }

    initREGL = (canvas) => {
        const gl = canvas.getContext('webgl')
        const regl = REGL(gl)
        const geoetry = makePlaneGeo(this.props.MAP_Resolution)
        this.drawHeightMap = regl({
            frag: fShader,
            vert: vShader,
            attributes: {
                position: geoetry
            },
            uniforms: {
                seed: regl.prop('GEN_Seed'),
                scale: regl.prop('GEN_scale'),
                persistance: regl.prop('GEN_persistance'),
                lacunarity: regl.prop('GEN_lacunarity'),
                octaves: regl.prop('GEN_octaves'),
                redistribution: regl.prop('GEN_redistribution'),
                xoff: regl.prop('GEN_xOff'),
                yoff: regl.prop('GEN_yOff'),

                island: false

            },
            count: geoetry.length
        })
        regl.frame(() => {
            if (this.props.INTERNAL_doesCaptureMap) {
                var link = document.createElement('a');
                link.download = 'filename.png';
                link.href = canvas.toDataURL('image/png')
                link.click();

                this.props.set_INTERNAL_doesCaptureMap(false)
            }
        })

        this.drawHeightMap({ ...this.props })

        return regl
    }

    updateCanvas = () => {
        this.drawHeightMap({ ...this.props })
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

function mapStateToProps(state) {
    return {
        MAP_Resolution: state.MAP_Resolution,
        INTERNAL_doesCaptureMap: state.INTERNAL_doesCaptureMap,

        GEN_Seed: state.GEN_Seed,
        GEN_scale: state.GEN_Scale,
        GEN_persistance: state.GEN_Persistance,
        GEN_lacunarity: state.GEN_Lacunarity,
        GEN_octaves: state.GEN_Octaves,
        GEN_redistribution: state.GEN_Redistribution,
        GEN_xOff: state.GEN_xOff,
        GEN_yOff: state.GEN_yOff,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_INTERNAL_doesCaptureMap: (data) => dispatch({ type: 'set_INTERNAL_doesCaptureMap', data: data })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapPreviewViewController)
