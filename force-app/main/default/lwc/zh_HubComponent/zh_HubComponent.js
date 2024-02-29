import { LightningElement } from 'lwc';

export default class Zh_HubComponent extends LightningElement {
 
    mapPointers = [
        {
            location: {
                Street: 'T-1 Flat no - 1007 Emami Swanlake Apartments',
                City: 'Hyderabad',
                State: 'TS',
            },
 
            title: 'Emami Swanlake Apartments',
            description:
                'One of the best projects in Kukatpally to live in.',
        },
        {
            location: {
                Street: 'Pillar No 833, Military Rajanna Hotel',
                City: 'Hyderabad',
                State: 'TS',
            },
 
            title: 'Military Rajanna Hotel',
            description: 'The best hotel in the hyderabad',
        },
        {
            location: {
                Street: 'AGI Colony, Moosapet, Maneesh Marvel Apartments',
                City: 'Hyderabad',
                State: 'TS',
            },
 
            title: 'Maneesh Marvel Apartments',
            description:
                'Apartments.',
        },
    ];
 
    markersTitle = 'Coordinates for Centering';
 
    center = {
        location: { Latitude: '40.7831856', Longitude: '-73.9675653' },
    };
}