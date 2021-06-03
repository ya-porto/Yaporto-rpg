const fileRegex = /\.(woff(2)?|eot|ttf|otf|svg|)$/;

export default {
	client: {
		loader: 'file-loader',
		options: {
			name: 'fonts/[name].[ext]'
		},
		test: fileRegex
	},
	server: {
		loader: 'null-loader',
		test: fileRegex
	}
};
