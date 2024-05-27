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

import { Avatar, Card, Container, Drawer, Grid, GridCol, Group, Skeleton, Space, Stack, Tooltip } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import About from "./About";
import FileTypes from "./FileTypes";
import { Directory } from "../model/Directory.gen";
import React from "react";
import { Sparkline } from "@mantine/charts";

interface HeaderProps {
  dir: Directory
}

/** Header is used to render information about the proportion,
  * current user, etc. of the home page header.
  * 
  * TODO: Optimized rendering of users and user details
  *       SparkLine in this component is not yet complete */
const Header: React.FC<HeaderProps> = ({ dir }) => {
  const [userDetailsState, setUserDetailsState] = useDisclosure(false);

  return (
    <Container>
      <Grid>
        <GridCol span={12}>
          <Tooltip label="Capacity Trends">
            <Sparkline
              w={"100%"}
              h={"5em"}
              data={[10, 20, 40, 20, 40, 10, 50]}
              curveType="natural"
              
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </Tooltip>
        </GridCol>
        <Grid.Col>
          <Group justify="space-between" mt="md" mb="xs">
            <FileTypes dir={dir} />
            <Avatar color="red" size={"xl"} alt="" src={"/src/assets/logo.png"} onClick={() => setUserDetailsState.open()} />
            <Drawer
              opened={userDetailsState}
              onClose={setUserDetailsState.close}
              offset={8}
              title="Details"
              position="right"
              overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
              radius={"md"}
            >
              <Stack>
                <Space h={"md"} />
                <Card shadow="sm">
                  <Skeleton height={50} circle mb="xl" />
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} mt={6} radius="xl" />
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                </Card>
                <Space h={"lg"} />
                <About />
              </Stack>
            </Drawer>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Header;
