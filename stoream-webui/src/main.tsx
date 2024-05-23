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

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';

import Error from "./pages/Error";
import App from "./pages/App";
import { fetch } from "./components/Files";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications position="top-right" zIndex={1000} />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/login",
            element: <Login />,
            errorElement: <Error />
          },
          {
            path: "/",
            element: <App />,
            errorElement: <Error />,
            loader: async () => { return await fetch() }
          },
        ])}
      />
    </MantineProvider>
  </React.StrictMode>,
);
