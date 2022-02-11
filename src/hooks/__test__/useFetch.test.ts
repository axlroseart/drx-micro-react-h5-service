import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import useFetch from 'hooks/useFetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// mock api request
const server = setupServer(
	rest.get('/getPrice', (req, res, ctx: any) => {
		return res(ctx.json());
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const apiClient = () =>
	useFetch({
		url: '/getPrice',
		queryParams: {
			country: 'us'
		}
	});

describe('Test React hook - useFetch', () => {
	// arrange
	it('Should in pendding status when this hook given sevral request parameters and begin to fetch', async () => {
		// act
		const { result } = renderHook(apiClient);
		console.log('==> result.current 1:', result.current);
		// assert
		expect(result.current).toEqual({
			loading: true,
			status: 'pending',
			value: undefined,
			error: undefined
		});
	});
	it('Should success', async () => {
		server.use(
			rest.get('/getPrice', (req, res, ctx: any) => {
				return res(
					ctx.json({
						price: 49
					})
				);
			})
		);
		const { result, waitForNextUpdate } = renderHook(apiClient);
		// await act(() => waitForNextUpdate());
		await waitForNextUpdate();
		console.log('==> result.current 2:', result.current);
		expect(result.current).toEqual({
			loading: false,
			status: 'success',
			value: {
				price: 49
			},
			error: undefined
		});
	});
	it('Should error', async () => {
		server.use(
			rest.get('/getPrice', (req, res, ctx: any) => {
				return res(ctx.status(500));
			})
		);
		const { result, waitForNextUpdate } = renderHook(apiClient);
		await waitForNextUpdate();
		console.log('==> result.current 3:', result.current);
		expect(result.current).toEqual({
			loading: false,
			status: 'none',
			value: undefined,
			error: undefined
		});
	});
});
