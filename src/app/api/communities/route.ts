import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get(
      'https://devsow.wpengine.com/wp-json/communities/all',
      {
        headers: {
          Authorization: 'Basic bmVoYTowI21JdkJCdzRBdWJoKTU5QXhEQ0hIQTU=',
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communities' },
      { status: 500 }
    );
  }
}
