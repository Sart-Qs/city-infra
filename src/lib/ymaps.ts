/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDom from 'react-dom';

const ymaps3 = await (window as any).ymaps3
if (!ymaps3){
    console.log("api не загружен");
}
const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
export const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls} = reactify.module(ymaps3);
