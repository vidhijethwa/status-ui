export const fetchQuoteData = async () => {
      try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quote`);

            const quotedata = await res.json();

            if (!res.ok) throw new Error(quotedata.err || 'Failed to fetch quote');

            return quotedata;
      } catch (err: any) {
            throw new Error(err.message || 'Network error');
      }
};
