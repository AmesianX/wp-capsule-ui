/* vim:ts=4:sts=4:sw=4:
 * ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Jan Jongboom <fabian AT ajax DOT org>
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define('cf/js/static_highlight', ['require', 'exports', 'module', 
    'ace/edit_session', 'ace/layer/text', 'ace/requirejs/text!ace/ext/static.css'], 
function(require, exports, module) {
"use strict";

var EditSession = require("ace/edit_session").EditSession;
var TextLayer = require("ace/layer/text").Text;
var baseStyles = require("ace/requirejs/text!ace/ext/static.css");

/* Transforms a given input code snippet into HTML using the given mode
*
* @param {string} input Code snippet
* @param {mode} mode Mode loaded from /ace/mode (use 'ServerSideHiglighter.getMode')
* @param {string} r Code snippet
* @returns {object} An object containing: html, css
*/

exports.render = function(input, mode, theme, lineStart, language) {
    lineStart = parseInt(lineStart || 1, 10);
    
    var session = new EditSession("");
    session.setMode(mode);
    session.setUseWorker(false);
    
    var textLayer = new TextLayer(document.createElement("div"));
    textLayer.setSession(session);
    textLayer.config = {
        characterWidth: 10,
        lineHeight: 20
    };
    
    session.setValue(input);
            
    var gutterBuilder = [];
    var stringBuilder = [];
    var olStyle = "";
    var length =  session.getLength();
    
    for(var ix = 0; ix < length; ix++) {
        stringBuilder.push("<li class='ace_line'>");
        textLayer.$renderLine(stringBuilder, ix, true, false);
        stringBuilder.push("</li>");
    }
    
    if (1 !== lineStart) {
    	olStyle = " style='counter-reset: item " + lineStart + ";' ";
    }
    // let's prepare the whole html
    var html = "<div class='static_container'>\
			<span class='code_language'>:language</span>\
				<div class=':cssClass'>\
					<pre class='static_code'><ol :olStyle>:code</ol></pre>\
				</div>\
			</div>"
		.replace(/:cssClass/, theme.cssClass)
		.replace(/:language/, language)
		.replace(/:olStyle/, olStyle)
		.replace(/:gutter/, gutterBuilder.join(""))
		.replace(/:code/, stringBuilder.join(""));
        
    textLayer.destroy();
            
    return {
        css: baseStyles + theme.cssText,
        html: html
    };
};

});
