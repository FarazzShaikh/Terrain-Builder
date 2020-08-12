import React, { Component } from 'react';
import "./App.css";
import ThreeDViewController from './Components/3dView/ThreeDViewController';

import UIRootViewController from './Components/ui/TerrainSettings/UIRootViewController';
import ProjectInfoRootViewController from './Components/ui/ProjectSettings/ProjectInfoRootViewController';
import SocialsRootViewController from './Components/ui/Socials/SocialsRootViewController';

export default class App extends Component {
  render() {
    return (
      <>
        <ThreeDViewController />

        <UIRootViewController />
        <ProjectInfoRootViewController />
        <SocialsRootViewController />
      </>
    );
  }
}
//
