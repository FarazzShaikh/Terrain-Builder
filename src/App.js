import React, { Component } from 'react';
import "./App.css";
import ThreeDViewController from './components/3dView/ThreeDViewController';

import UIRootViewController from './components/ui/TerrainSettings/UIRootViewController';
import ProjectInfoRootViewController from './components/ui/ProjectSettings/ProjectInfoRootViewController';
import SocialsRootViewController from './components/ui/Socials/SocialsRootViewController';

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
