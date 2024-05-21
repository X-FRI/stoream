/// Copyright (c) 2024 The X-Files Research Institute
/// 
/// All rights reserved.
/// 
/// Redistribution and use in source and binary forms, with or without modification,
/// are permitted provided that the following conditions are met:
/// 
///     * Redistributions of source code must retain the above copyright notice,
///       this list of conditions and the following disclaimer.
///     * Redistributions in binary form must reproduce the above copyright notice,
///       this list of conditions and the following disclaimer in the documentation
///       and/or other materials provided with the distribution.
///     * Neither the name of Stoream nor the names of its contributors
///       may be used to endorse or promote products derived from this software
///       without specific prior written permission.
/// 
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
/// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
/// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
/// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
/// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
/// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
/// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
/// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
/// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
/// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
/// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { Tree, useToasts } from "@geist-ui/core"
import { t as Folder } from "../model/FileTree.gen.tsx"
import { FileTree as RequestFileTree } from "../model/Request.gen.tsx"

const mapFolder = (folder: Folder) => {
    if (folder.sub === undefined) {
        return <Tree.Folder name={folder.name} />
    } else {
        const subFolder = folder.sub.map(mapFolder)
        return (
            <Tree.Folder name={folder.name} extra={folder.files.length + " files"}>
                {subFolder}
            </Tree.Folder>
        )
    }
}

const loadFolder = async (path: string) => { return await RequestFileTree.request(path) }

const FileTree = ({ content }) => {
    return (
        <>
            <Tree>
                {mapFolder(content)}
            </Tree>
        </>
    )
}

export { loadFolder }
export default FileTree