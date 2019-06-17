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
import {TranslateService} from '@ngx-translate/core';
import {ModalDirective} from "ngx-bootstrap";
import {CommonPageModel} from "../../../../shared/model/common/response/page.model";
import {CodeConfig} from "../../../../../config/code.config";
import {Json2csvService} from "../../../../../services/tools/json/json.2csv.service";

@Component({
    selector: 'bootstack-tools-json-2csv-format',
    templateUrl: './tools.json.2csv.component.html'
})
export class ToolsJson2csvComponent implements OnInit {

    public loading: Subscription;
    public options: any = {printMargin: false, wrap: 'free'};
    public page: CommonPageModel;
    public currentPage: number;

    @ViewChild('showDetailModal')
    public showDetailModal: ModalDirective;
    @ViewChild('inputEditor')
    public inputEditor;
    @ViewChild('outputEditor')
    public outputEditor;

    constructor(private router: Router,
                private toastyService: ToastyService,
                private translate: TranslateService,
                private json2csvService: Json2csvService) {
        translate.addLangs(['zh-CN', 'en']);
        translate.setDefaultLang('zh-CN');
        let broswerLang = translate.getBrowserLang();
        translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
        this.page = new CommonPageModel();
    }

    ngOnInit() {
    }

    /**
     * 转换数据
     */
    convertToCsv() {
        this.outputEditor.writeValue("");
        this.loading = this.json2csvService.convertToCsv(this.inputEditor.getEditor().getValue()).subscribe(
            response => {
                if (response.code !== CodeConfig.SUCCESS) {
                    this.toastyService.error(response.message);
                } else {
                    this.outputEditor.getEditor().setValue(response.data);
                    this.outputEditor.getEditor().resize();
                }
            }
        );
    }

}
