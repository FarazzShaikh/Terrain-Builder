import Defaults from './Defaults';


const Reducer = (state = Defaults, action) => {
    switch (action.type) {
        case 'set_GEN_Resolution': {
            return {
                ...state,
                GEN_Resolution: action.data,
            }
        }

        case 'set_META_ProjectName': {
            return {
                ...state,
                META_ProjectName: action.data,
            }
        }

        case 'set_INTERNAL_doesCaptureMap': {
            return {
                ...state,
                INTERNAL_doesCaptureMap: action.data,
            }
        }

        case 'set_MAP_Resolution': {
            return {
                ...state,
                MAP_Resolution: action.data
            }
        }

        case 'set_GEN': {
            switch (action.label) {
                case 'Scale':
                    return {
                        ...state,
                        GEN_Scale: action.data
                    }
                case 'Persistance':
                    return {
                        ...state,
                        GEN_Persistance: action.data
                    }
                case 'Lacunarity':
                    return {
                        ...state,
                        GEN_Lacunarity: action.data
                    }
                case 'Octaves':
                    return {
                        ...state,
                        GEN_Octaves: action.data
                    }
                case 'Redistribution':
                    return {
                        ...state,
                        GEN_Redistribution: action.data
                    }
                case 'Height':
                    return {
                        ...state,
                        GEN_zScale: action.data
                    }
                case 'xOff':
                    return {
                        ...state,
                        GEN_xOff: action.data
                    }
                case 'yOff':
                    return {
                        ...state,
                        GEN_yOff: action.data
                    }
                case 'Seed':
                    return {
                        ...state,
                        GEN_Seed: action.data
                    }

                default:
                    break;
            }
            break;
        }
        default:
            break;
    }
    return state
}

export default Reducer