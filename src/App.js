import React, { Component } from 'react';
import "./App.css";
import ThreeDViewController from './components/3dView/ThreeDViewController';
import UIRootViewController from './components/ui/projectSettings/UIRootViewController';
import ProjectInfoRootViewController from './components/ui/projectInfo/ProjectInfoRootViewController';

export default class App extends Component {
  render() {
    return (
      <>
        <ThreeDViewController />
        <UIRootViewController />
        <ProjectInfoRootViewController />
      </>
    );
  }
}
