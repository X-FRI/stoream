<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import Card from '@/components/ui/card/card.svelte';
	import { formSchema, type FormSchema } from './schema';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="mb-4 text-2xl font-bold">Login</h1>
	<Card class="w-full max-w-md p-4">
		<form method="POST" use:enhance>
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input {...attrs} bind:value={$formData.username} />
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} />
				</Form.Control>
				<Form.Description>8~12 passwords</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<div class="flex w-full justify-center">
				<Form.Button class="mt-4 w-1/2">Login</Form.Button>
			</div>
		</form>
	</Card>
</div>
