import './app.styles.css';
import { Component } from 'solid-js';
import { Section1 } from '@src/components/Section1/Section1';
import { Section2 } from '@src/components/Section2/Section2';
import { Section3 } from '@src/components/Section3/Section3';

export var App: Component = () => {
  return (
    <main>
      <Section1 />

      <hr />

      {/* <Section2 /> */}

      <hr />

      <Section3 />

      <hr />
    </main>
  );
};
