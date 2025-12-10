/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDom from 'react-dom';
import * as defaultUITheme from '@yandex/ymaps3-default-ui-theme';


const ymaps3 = await (window as any).ymaps3
if (!ymaps3){
    console.log("api не загружен");
}
const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
export const { YMapDefaultMarker, YMapZoomControl } = reactify.module(defaultUITheme);
export const {
    YMap, 
    YMapDefaultSchemeLayer, 
    YMapDefaultFeaturesLayer, 
    YMapMarker, 
    YMapControls,
    YMapListener,
} = reactify.module(ymaps3);

