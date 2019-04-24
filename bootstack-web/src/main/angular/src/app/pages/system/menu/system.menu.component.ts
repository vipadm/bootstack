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
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import {Subscription} from "rxjs";
import {CommonPageModel} from "../../../shared/model/common/response/page.model";
import {CodeConfig} from "../../../../config/code.config";
import {ModalDirective} from "ngx-bootstrap";
import {SystemMenuTypeParam} from "../../../shared/param/system/menu/system.menu.type.param";
import {SystemMenuService} from "../../../../services/system/system.menu.service";
import {SystemMenuParam} from "../../../shared/param/system/menu/system.menu.param";

@Component({
    selector: 'bootstack-system-menu',
    templateUrl: './system.menu.component.html'
})
export class SystemMenuComponent implements OnInit {

    public loading: Subscription;
    // menu list
    public models;
    // page model
    public page: CommonPageModel;
    // current page number
    public currentPage: number;

    @ViewChild('createAndUpdateModal')
    public createAndUpdateModal: ModalDirective;

    // model param info
    public param: SystemMenuParam;

    constructor(private router: Router,
                private toastyService: ToastyService,
                private systemMenuService: SystemMenuService) {
        this.page = new CommonPageModel();
        this.param = new SystemMenuParam();
    }

    ngOnInit() {
        this.models = this.initList(this.page, 1);
    }

    initList(page: CommonPageModel, uid: number) {
        this.loading = this.systemMenuService.getList(page).subscribe(
            response => {
                if (response.code !== CodeConfig.SUCCESS) {
                    this.toastyService.error(response.message);
                } else {
                    this.models = response.data.content;
                    this.page = CommonPageModel.getPage(response.data);
                    this.currentPage = this.page.number;
                }
            }
        );
    }

    /**
     * show modal
     */
    startShowCreateAndUpdateModal(model: any) {
        if (model) {
            this.param = model;
        } else {
            this.param = new SystemMenuParam();
        }
        this.createAndUpdateModal.show();
    }

    createAndUpdate() {
        console.log(this.param);
        // if (this.param.id) {
        //     this.systemMenuService.update(this.param).subscribe(
        //         response => {
        //             if (response.code !== CodeConfig.SUCCESS) {
        //                 this.toastyService.error(response.message);
        //             } else {
        //                 this.initList(this.page, 1);
        //                 this.createAndUpdateModal.hide();
        //             }
        //         }
        //     );
        // } else {
        //     this.systemMenuService.register(this.param).subscribe(
        //         response => {
        //             if (response.code !== CodeConfig.SUCCESS) {
        //                 this.toastyService.error(response.message);
        //             } else {
        //                 this.initList(this.page, 1);
        //                 this.createAndUpdateModal.hide();
        //             }
        //         }
        //     );
        // }
    }

    pageChanged(event: any) {
        this.page.number = event.page;
        this.page.size = event.itemsPerPage;
        this.loading = this.systemMenuService.getList(this.page).subscribe(
            response => {
                if (response.code !== CodeConfig.SUCCESS) {
                    this.toastyService.error(response.message);
                } else {
                    this.models = response.data.content;
                    this.page = CommonPageModel.getPage(response.data);
                    this.currentPage = this.page.number;
                }
            }
        );
    }

}
