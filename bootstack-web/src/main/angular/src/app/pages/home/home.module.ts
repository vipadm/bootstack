/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BusyConfig, BusyModule} from 'angular2-busy';
import {AngularEchartsModule} from 'ngx-echarts';

import {HomeComponent} from './home.component';

export function busyConfigFactory() {
    return new BusyConfig({
        message: 'Data loading, please wait...',
        backdrop: true,
    });
}

const HOME_ROUTES: Routes = [
    {path: '', component: HomeComponent}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BusyModule,
        AngularEchartsModule,
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        RouterModule.forChild(HOME_ROUTES)
    ],
    exports: [],
    declarations: [
        HomeComponent
    ],
    providers: [
        {
            provide: BusyConfig,
            useFactory: busyConfigFactory
        }
    ],
})
export class HomeModule {
}