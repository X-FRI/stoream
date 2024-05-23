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

import { Avatar, Center, Container, Divider, Drawer, Grid, GridCol, Group, RingProgress, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { DonutChart, Sparkline } from '@mantine/charts';

export const fileTypeDetails = [
  { name: 'Document', value: 400, color: 'indigo.6' },
  { name: 'Image', value: 300, color: 'yellow.6' },
  { name: 'Video', value: 300, color: 'teal.6' },
  { name: 'Picture', value: 200, color: 'gray.6' },
];

const Header = () => {
  const [fileDetailsState, setFileDetailsState] = useDisclosure(false);
  const [userDetailsState, setUserDetailsState] = useDisclosure(false);

  return (
    <Container>
      <Grid>
        <Grid.Col>
          <Group justify="space-between" mt="md" mb="xs">
            <RingProgress
              onClick={() => setFileDetailsState.open()}
              size={100}
              thickness={5}
              roundCaps
              label={
                <Text c="black" fw={700} ta="center" size="xl">
                  40%
                </Text>
              }
              sections={[
                { value: 40, color: 'blue' },
              ]}
            />

            <Title order={2}> Stoream </Title>

            <Drawer
              opened={fileDetailsState}
              onClose={setFileDetailsState.close}
              offset={8}
              title="Details"
              overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
              radius={"md"}
            >
              <Grid justify="center">
                <GridCol span={12}>
                  <Center>
                    <DonutChart
                      data={fileTypeDetails}
                      withLabelsLine
                      withLabels
                      chartLabel={"File Types"}
                    />
                  </Center>
                </GridCol>
                <GridCol span={12}>
                  <Center>
                    <Sparkline
                      w={"100%"}
                      h={"10em"}
                      data={[10, 20, 40, 20, 40, 10, 50]}
                      curveType="natural"
                      color="blue"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                  </Center>
                  <Divider my="md" />
                  <GridCol span={12}>
                    <Center>
                      <Text>Capacity Trends</Text>
                    </Center>
                  </GridCol>
                </GridCol>
              </Grid>
            </Drawer>

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
                <Skeleton height={50} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Stack>
            </Drawer>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Header;
