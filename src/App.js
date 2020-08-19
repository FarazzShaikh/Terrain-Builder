import React, { Component } from 'react';
import "./App.css";
import ThreeDViewController from './Components/3dView/ThreeDViewController';

import TerrainSettingsRootViewController from './Components/ui/TerrainSettings/TerrainSettingsRootViewController';
import ProjectInfoRootViewController from './Components/ui/ProjectSettings/ProjectInfoRootViewController';
import SocialsRootViewController from './Components/ui/Socials/SocialsRootViewController';

export default class App extends Component {



  render() {
    return (
      <>
        <ThreeDViewController />

        <TerrainSettingsRootViewController />
        <ProjectInfoRootViewController />
        <SocialsRootViewController />
      </>
    );
  }
}
//

